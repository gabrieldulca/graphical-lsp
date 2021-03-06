/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import "../css/diagram.css";
import "balloon-css/balloon.min.css";
import "sprotty/css/edit-label.css";

import {
    boundsModule,
    buttonModule,
    commandPaletteModule,
    configureModelElement,
    ConsoleLogger,
    decorationModule,
    defaultGLSPModule,
    defaultModule,
    DiamondNodeView,
    edgeLayoutModule,
    ExpandButtonView,
    expandModule,
    exportModule,
    fadeModule,
    glspCommandPaletteModule,
    glspEditLabelValidationModule,
    GLSPGraph,
    glspMouseToolModule,
    glspSelectModule,
    hoverModule,
    HtmlRoot,
    HtmlRootView,
    labelEditModule,
    labelEditUiModule,
    layoutCommandsModule,
    LogLevel,
    modelHintsModule,
    modelSourceModule,
    openModule,
    overrideGLSPViewerOptions,
    paletteModule,
    PreRenderedElement,
    PreRenderedView,
    RectangularNode,
    RectangularNodeView,
    requestResponseModule,
    routingModule,
    saveModule,
    SButton,
    SCompartment,
    SCompartmentView,
    SEdge,
    SGraphView,
    SLabel,
    SLabelView,
    SRoutingHandle,
    SRoutingHandleView,
    toolFeedbackModule,
    TYPES,
    validationModule,
    viewportModule
} from "@glsp/sprotty-client/lib";
import executeCommandModule from "@glsp/sprotty-client/lib/features/execute/di.config";
import { Container, ContainerModule } from "inversify";

import { ActivityNode, Icon, TaskLabel, TaskNode, WeightedEdge } from "./model";
import { WorkflowModelFactory } from "./model-factory";
import { IconView, TaskNodeView, WeightedEdgeView, WorkflowEdgeView } from "./workflow-views";


const workflowDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    rebind(TYPES.IModelFactory).to(WorkflowModelFactory).inSingletonScope();
    const context = { bind, unbind, isBound, rebind };
    configureModelElement(context, 'graph', GLSPGraph, SGraphView);
    configureModelElement(context, 'task:automated', TaskNode, TaskNodeView);
    configureModelElement(context, 'task:manual', TaskNode, TaskNodeView);
    configureModelElement(context, 'label:heading', TaskLabel, SLabelView);
    configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView);
    configureModelElement(context, 'comp:header', SCompartment, SCompartmentView);
    configureModelElement(context, 'label:icon', SLabel, SLabelView);
    configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
    configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
    configureModelElement(context, 'button:expand', SButton, ExpandButtonView);
    configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
    configureModelElement(context, 'edge', SEdge, WorkflowEdgeView);
    configureModelElement(context, 'edge:weighted', WeightedEdge, WeightedEdgeView);
    configureModelElement(context, 'icon', Icon, IconView);
    configureModelElement(context, 'activityNode:merge', ActivityNode, DiamondNodeView);
    configureModelElement(context, 'activityNode:decision', ActivityNode, DiamondNodeView);
    configureModelElement(context, 'node', RectangularNode, RectangularNodeView);
});

export default function createContainer(widgetId: string): Container {
    const container = new Container();

    container.load(decorationModule, validationModule, defaultModule, glspMouseToolModule, defaultGLSPModule, glspSelectModule, boundsModule, viewportModule,
        hoverModule, fadeModule, exportModule, expandModule, openModule, buttonModule, modelSourceModule, labelEditModule, labelEditUiModule, glspEditLabelValidationModule,
        workflowDiagramModule, saveModule, executeCommandModule, toolFeedbackModule, modelHintsModule,
        commandPaletteModule, glspCommandPaletteModule, paletteModule, requestResponseModule, routingModule, edgeLayoutModule,
        layoutCommandsModule);

    overrideGLSPViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + "_hidden",
        noElementOverlap: true,
        needsClientLayout: true
    });

    return container;
}
