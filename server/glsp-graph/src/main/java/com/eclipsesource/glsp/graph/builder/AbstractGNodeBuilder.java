/*******************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *  
 *   This program and the accompanying materials are made available under the
 *   terms of the Eclipse Public License v. 2.0 which is available at
 *   http://www.eclipse.org/legal/epl-2.0.
 *  
 *   This Source Code may also be made available under the following Secondary
 *   Licenses when the conditions for such availability set forth in the Eclipse
 *   Public License v. 2.0 are satisfied: GNU General Public License, version 2
 *   with the GNU Classpath Exception which is available at
 *   https://www.gnu.org/software/classpath/license.html.
 *  
 *   SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ******************************************************************************/
package com.eclipsesource.glsp.graph.builder;

import com.eclipsesource.glsp.graph.GEdgePlacement;
import com.eclipsesource.glsp.graph.GLayoutOptions;
import com.eclipsesource.glsp.graph.GNode;

public abstract class AbstractGNodeBuilder<T extends GNode, E extends AbstractGNodeBuilder<T, E>>
		extends GShapeElementBuilder<T, E> {

	protected String layout;
	protected GLayoutOptions layoutOptions;
	protected GEdgePlacement edgePlacement;

	public AbstractGNodeBuilder(String type) {
		super(type);
	}

	public E layoutOptions(GLayoutOptions layoutOptions) {
		this.layoutOptions = layoutOptions;
		return self();
	}

	public E edgePlacement(GEdgePlacement edgePlacement) {
		this.edgePlacement = edgePlacement;
		return self();
	}

	public E layout(String layout) {
		this.layout = layout;
		return self();
	}

	@Override
	protected void setProperties(T node) {
		super.setProperties(node);
		node.setLayoutOptions(layoutOptions);
		node.setLayout(layout);
		node.setEdgePlacement(edgePlacement);
	}
}
