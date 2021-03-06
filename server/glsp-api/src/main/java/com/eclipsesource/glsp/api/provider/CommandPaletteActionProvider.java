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
package com.eclipsesource.glsp.api.provider;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.eclipsesource.glsp.api.model.GraphicalModelState;
import com.eclipsesource.glsp.api.types.LabeledAction;
import com.eclipsesource.glsp.graph.GPoint;

@FunctionalInterface
public interface CommandPaletteActionProvider {

	Set<LabeledAction> getActions(GraphicalModelState modelState, List<String> selectedElementIds, String text,
			Optional<GPoint> lastMousePosition);

	default Set<LabeledAction> getActions(GraphicalModelState modelState, List<String> selectedElementIds, String text,
			GPoint lastMousePosition) {
		return getActions(modelState, selectedElementIds, text, Optional.ofNullable(lastMousePosition));
	}

	public static class NullImpl implements CommandPaletteActionProvider {
		@Override
		public Set<LabeledAction> getActions(GraphicalModelState modelState, List<String> selectedElementIds,
				String text, Optional<GPoint> lastMousePosition) {
			return Collections.emptySet();
		}
	}
}
